pragma solidity ^0.5.11;

contract Katalyst {

    mapping(string => uint256) public katalystIndex;
    string[] public katalyst;

    event Addkatalyst(string _katalyst);
    event RemoveKatalyst(string _katalyst);

    constructor() public {
        // Initialize first position with an invalid record
        katalyst.push('invalid');
    }

    function addKatalyst(string memory _katalyst) public {
        require(katalystIndex[_katalyst] == 0, "Katalyst already defined");

        uint256 index = katalyst.push(_katalyst);
        katalystIndex[_katalyst] = index - 1;

        emit Addkatalyst(_katalyst);
    }

    function removeKatalyst(string memory _katalyst) public {
        require(katalystIndex[_katalyst] > 0, "Katalyst is not defined");

        // Katalyst length
        uint256 lastKaralystIndex = katalystCount();
        // Index of the katalyst to remove in the array
        uint256 removedIndex = katalystIndex[_katalyst];
        // Last katalyst
        string memory lastKatalyst = katalyst[lastKaralystIndex];

        // Override index of the katalyst to remove value with the last katalyst
        katalyst[removedIndex] = lastKatalyst;
        katalystIndex[lastKatalyst] = removedIndex;

        // Remove the last katalyst from the storage
        katalyst.pop();
        delete katalystIndex[_katalyst];

        emit RemoveKatalyst(_katalyst);
    }

    function katalystCount() public view returns (uint256) {
        return katalyst.length - 1;
    }

    function getKatalyst(uint256 _index) public view returns (string memory) {
        require(_index <= katalystCount(), "Out of bounds");
        return katalyst[_index + 1];
    }
}